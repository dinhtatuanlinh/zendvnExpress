// tạo nút phân loại active inactive
const ItemsModel = require(__pathSchemas + 'database').itemsModel;

var count = (cond) => {
    return new Promise((res, rej) => {
        // console.log(cond);
        ItemsModel.countDocuments(cond, (err, data) => {
            if (err) return console.log(err); // cần phải có đoạn code này thì mới lấy được số lượng document
            // console.log(data);
            res(data);
        })
    })
}
var delay = (status, statusFilter) => {
    return new Promise(async(res, rej) => {
        var i = 0;
        for (var item of statusFilter) {
            let cond = {};
            if (item.name !== 'all') cond = { status: item.name };
            if (item.name === status) statusFilter[i].class = 'success';
            var num = await count(cond);
            // console.log('abc');

            statusFilter[i].num = num;
            // console.log(statusFilter[i]);
            i++;
        }
        res(statusFilter);
    })

};
var statusButton = async(status, statusFilter) => {
        var result = await delay(status, statusFilter);
        return result;
    }
    // end tạo nút phân loại active inactive
    // pagination parameter
var pagiFunc = async(currentPage, totalItems) => {

    if (isNaN(currentPage) || currentPage === undefined) currentPage = 1;

    var pagiParams = {
        itemsPerPage: 8,
        currentPage: currentPage,
        totalItems: totalItems
    }
    var position = (pagiParams.currentPage - 1) * pagiParams.itemsPerPage;
    pagiParams.position = position;
    var totalPages = Math.ceil(totalItems / pagiParams.itemsPerPage);
    pagiParams.totalPages = totalPages;
    return pagiParams
}

// end pagination parameter
module.exports = {
    statusButton: statusButton,
    pagiFunc: pagiFunc
}