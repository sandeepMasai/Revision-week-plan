class QueryOptimizer {
  constructor(threshold = 2) {
    this.threshold = threshold;
    this.queryFrequency = {};
    this.cache = new Map();
  }

  normalizeFilters(filters) {
    return Object.keys(filters)
      .sort()
      .map((key) => `${key}:${filters[key]}`)
      .join("|");
  }

  analyze(query) {
    const { collection, filters } = query;
    const key = `${collection}::${this.normalizeFilters(filters)}`;

    this.queryFrequency[key] = (this.queryFrequency[key] || 0) + 1;
  }

  recommendIndexes() {
    const recommendations = {};

    for (const key in this.queryFrequency) {
      if (this.queryFrequency[key] >= this.threshold) {
        const [collection, filterStr] = key.split("::");
        const fields = filterStr.split("|").map((f) => f.split(":")[0]);

        if (!recommendations[collection]) {
          recommendations[collection] = [];
        }

        recommendations[collection].push(fields);
      }
    }

    return recommendations;
  }

  fetchFromDB(query) {
    console.log(" DB HIT:", query);
    return { success: true, data: "FAKE_DB_RESULT" };
  }

  execute(query) {
    const cacheKey = `${query.collection}::${this.normalizeFilters(
      query.filters
    )}`;

    if (this.cache.has(cacheKey)) {
      console.log(" CACHE HIT");
      return this.cache.get(cacheKey);
    }

    console.log(" CACHE MISS");
    const result = this.fetchFromDB(query);
    this.cache.set(cacheKey, result);
    return result;
  }
}

module.exports = QueryOptimizer;
