// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// @title SuiStream - A decentralized content streaming platform on Sui
///
/// This module implements the core functionality for SuiStream, including:
/// - User subscription management with different tiers
/// - Content access control based on subscription level
/// - Payment processing for subscriptions

module suistream::suistream {
    use sui::coin::Coin;
    use sui::sui::SUI;
    
    // ==========  Constants  ==========
    
    /// Subscription tiers
    const TIER_BASIC: u8 = 1;
    const TIER_PREMIUM: u8 = 2;
    const TIER_ULTIMATE: u8 = 3;
    
    /// Subscription prices in SUI
    const BASIC_SUBSCRIPTION_PRICE: u64 = 5_000_000_000; // 5 SUI
    const PREMIUM_SUBSCRIPTION_PRICE: u64 = 10_000_000_000; // 10 SUI
    const ULTIMATE_SUBSCRIPTION_PRICE: u64 = 15_000_000_000; // 15 SUI
    
    /// Subscription durations in milliseconds (30 days)
    const SUBSCRIPTION_DURATION_MS: u64 = 30 * 24 * 60 * 60 * 1000;
    
    // ==========  Errors  ==========
    
    /// Unauthorized access
    const E_UNAUTHORIZED: u64 = 2;
    /// Invalid subscription tier
    const E_INVALID_TIER: u64 = 3;
    /// Content access denied
    const E_ACCESS_DENIED: u64 = 5;

    // ==========  Structs  ==========
    
    /// Represents a user's subscription
    public struct Subscription has key, store {
        id: UID,
        user: address,
        tier: u8, // 1: Basic, 2: Premium, 3: Ultimate
        expires_at: u64, // Unix timestamp in milliseconds
    }

    /// Represents content in the streaming platform
    public struct Content has key, store {
        id: UID,
        owner: address,
        title: vector<u8>,
        description: vector<u8>,
        content_url: vector<u8>,
        thumbnail_url: vector<u8>,
        min_tier: u8, // Minimum subscription tier required to access
        price: Option<u64>, // Optional one-time purchase price
    }

    /// Tracks content view counts
    public struct ContentStats has key, store {
        id: UID,
        content_id: ID,
        view_count: u64,
    }

    // ==========  Events  ==========
    
    /// Emitted when a new subscription is created or renewed
    public struct SubscriptionEvent has copy, drop {
        user: address,
        tier: u8,
        expires_at: u64,
        amount: u64,
    }

    /// Emitted when content is viewed
    public struct ContentViewEvent has copy, drop {
        content_id: ID,
        viewer: address,
        timestamp: u64,
    }

    // ==========  Initialization  ==========
    
    /// Initialize the SuiStream module
    fun init(witness: &sui::tx_context::TxContext) {
        // Module initialization logic can go here
        let _ = witness; // Mark as used
    }

    // ==========  Subscription Functions  ==========
    
    /// Subscribe to a tier with SUI
    public entry fun subscribe(
        payment: &mut Coin<SUI>,
        tier: u8,
        ctx: &mut sui::tx_context::TxContext,
    ) {
        let amount = get_subscription_price(tier);
        let sender = sui::tx_context::sender(ctx);
        
        // Create a new subscription
        let subscription = Subscription {
            id: sui::object::new(ctx),
            user: sender,
            tier,
            expires_at: (sui::tx_context::epoch_timestamp_ms(ctx) + SUBSCRIPTION_DURATION_MS) as u64,
        };
        
        // Transfer payment to the platform wallet
        let payment_amount = sui::coin::split(payment, amount, ctx);
        let platform_wallet = @0xdedef1d507c9be500c5702be259a1dea45ccbbd7ca58c86ab8e31d169cf07a2e;
        sui::transfer::public_transfer(payment_amount, platform_wallet);
        
        // Transfer subscription to user
        sui::transfer::public_transfer(subscription, sender);
        
        // Emit subscription event
        sui::event::emit(SubscriptionEvent {
            user: sender,
            tier,
            expires_at: (sui::tx_context::epoch_timestamp_ms(ctx) + SUBSCRIPTION_DURATION_MS) as u64,
            amount,
        });
    }
    
    /// Get the subscription price for a tier
    public fun get_subscription_price(tier: u8): u64 {
        if (tier == TIER_BASIC) {
            BASIC_SUBSCRIPTION_PRICE
        } else if (tier == TIER_PREMIUM) {
            PREMIUM_SUBSCRIPTION_PRICE
        } else if (tier == TIER_ULTIMATE) {
            ULTIMATE_SUBSCRIPTION_PRICE
        } else {
            abort E_INVALID_TIER
        }
    }
    
    /// Check if a user has an active subscription of at least the required tier
    public fun has_active_subscription(
        subscription: &Subscription,
        required_tier: u8,
        ctx: &sui::tx_context::TxContext
    ): bool {
        let current_time = sui::tx_context::epoch_timestamp_ms(ctx);
        subscription.tier >= required_tier && subscription.expires_at > (current_time as u64)
    }

    // ==========  Content Functions  ==========
    
    /// Create new content
    public entry fun create_content(
        title: vector<u8>,
        description: vector<u8>,
        content_url: vector<u8>,
        thumbnail_url: vector<u8>,
        min_tier: u8,
        price: Option<u64>,
        ctx: &mut TxContext,
    ) {
        let sender = sui::tx_context::sender(ctx);
        let content_id = sui::object::new(ctx);
        let stats_id = sui::object::new(ctx);
        
        // Create content object
        let content = Content {
            id: content_id,
            owner: sender,
            title,
            description,
            content_url,
            thumbnail_url,
            min_tier,
            price,
        };
        
        // Create stats object
        let stats = ContentStats {
            id: stats_id,
            content_id: sui::object::id(&content),
            view_count: 0,
        };
        
        // Transfer content to owner
        sui::transfer::public_transfer(content, sender);
        sui::transfer::public_transfer(stats, sender);
    }
    
    /// View content (checks subscription)
    public entry fun view_content(
        content: &mut Content,
        stats: &mut ContentStats,
        subscription: &Subscription,
        ctx: &TxContext,
    ) {
        // Check if user has required subscription tier
        assert!(
            has_active_subscription(subscription, content.min_tier, ctx),
            E_ACCESS_DENIED
        );
        
        // Update view count
        stats.view_count = stats.view_count + 1;
        
        // Emit view event
        sui::event::emit(ContentViewEvent {
            content_id: sui::object::id(content),
            viewer: sui::tx_context::sender(ctx),
            timestamp: sui::tx_context::epoch_timestamp_ms(ctx) as u64,
        });
    }
    
    // ==========  Admin Functions  ==========
    
    /// Update content metadata (owner only)
    public entry fun update_content(
        content: &mut Content,
        title: vector<u8>,
        description: vector<u8>,
        min_tier: u8,
        price: Option<u64>,
        ctx: &TxContext,
    ) {
        assert!(content.owner == sui::tx_context::sender(ctx), E_UNAUTHORIZED);
        content.title = title;
        content.description = description;
        content.min_tier = min_tier;
        content.price = price;
    }
    
    // ==========  Helper Functions  ==========
    
    /// Get the current subscription tier name
    public fun get_tier_name(tier: u8): vector<u8> {
        if (tier == TIER_BASIC) {
            b"Basic"
        } else if (tier == TIER_PREMIUM) {
            b"Premium"
        } else if (tier == TIER_ULTIMATE) {
            b"Ultimate"
        } else {
            b"Unknown"
        }
    }
}
