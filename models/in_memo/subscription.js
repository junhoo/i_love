class Subscription {
    constructor(userId, url) {
        this.userId = userId;
        this.url = url;
    }

    // 返回用户订阅列表
    static list() {
        return Subscription.subscriptions;
    }

    // 新增用户订阅地址
    static insert(userId, url) {
        const sub = new Subscription(userId, url);
        Subscription.subscriptions.push(sub);
        return sub;
    }

    // 查询用户
    static findByUserId(userId) {
        return Subscription.subscriptions.map(s => s.userId === userId);
    }
}

Subscription.subscriptions = [];

module.exports = Subscription;