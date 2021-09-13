class APIFeatures {
      constructor(query, queryStr) {
          this.query = query;
          this.queryStr = queryStr
      }

      search(){

        this.query = this.query.find({name: {
            $regex : this.queryStr.keyword,
            $options: 'i'
         }})

        return this;
      }

      filter(){

        const queryCopy = {...this.queryStr}

        console.log(queryCopy);

        //remove fields from the query
        const removeFields = ["keyword" , "limit", "page"]
        removeFields.forEach(el => delete queryCopy[el])
        
        console.log(queryCopy) 
        //advance filters for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)
       queryStr = queryStr.replace(/\b(gt|gte|lt|lte)|b/g, match => `$${match}`)

        console.log(queryStr)

        this.query = this.query.find(JSON.parse(queryStr))
        return this;
      }

      pagination(resPerPage){

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
      }
        
      
}

module.exports = APIFeatures;


      