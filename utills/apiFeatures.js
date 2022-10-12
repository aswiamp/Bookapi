class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; //converts string to integer ,default is 1
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    // console.log(skip);
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
