const { check, validationErrors } = require('express-validator');
module.exports = {
    validator: [
        check('name', 'chiều dài từ 5 tới 10 ký tự').isLength({min: 5, max: 10}),
        // check('ordering', 'Phải là số nguyên lớn hơn 0 và bé hơn 100').isInt({gt: 0, lt: 100}),
        check('status').custom((value) => {
            if (value === 'novalue') {
            throw new Error('chưa chọn status');
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
    ]
}