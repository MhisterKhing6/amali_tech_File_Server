/**Controls admin operations */

class AdminController {
    /** */
    static uploadFile = async (req, res) => {
        /**
         * uploadFile: upload file handler for admin users
         * @param {object} req: http request object
         * @param {object} res: http response object
         * @return {object} json response
         */
        return res.status(200).send("not implemented")
    }
}

export {AdminController}