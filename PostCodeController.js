const request = require('request');
const PostCode = require('./PostCode')

class PostCodeController {
    constructor() {
    }

    /**
     * @param postCodeStr, e.g: AB12 3AB
     * @return Promise<PostCode>
     */
    getPostCode(postCodeStr) {
        return this.getPostCodeDetail(postCodeStr)
            .then(detail => new PostCode(postCodeStr, detail.result.longitude, detail.result.latitude));
    }

    /**
     * @param postCodeStr, e.g: AB12 3AB
     * @return Promise<PostCodeDetail>
     */
    getPostCodeDetail(postCodeStr) {
        const url = 'http://api.postcodes.io/postcodes';

        // return new pending promise
        return new Promise((resolve, reject) => {

            request.post({
                url: url,
                json: {'postcodes':[postCodeStr]},
            }, function (error, response, body) {
                    if (error != null)
                        reject(error);
                    else if (response.statusCode === 404 || body.status === 404 || body.result[0].result === null)
                        reject('Invalid post code!');
                    else
                        resolve(body);
            });
        }).then(data => data.result[0]); //sent one postcode so return the first result
    }
}

module.exports = PostCodeController;
