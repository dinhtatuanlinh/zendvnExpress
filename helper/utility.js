// tạo nút phân loại active inactive
const ItemsModel = require('./../schemas/items');
let statusFilter = [
    {name: 'all', num: null, link: '#', class: 'default'},
    {name: 'active', num: null, link: '#', class: 'default'},
    {name: 'inactive', num: null, link: '#', class: 'default'},
];
var count = (cond) =>{
    return new Promise((res, rej) =>{
        // console.log(cond);
        ItemsModel.countDocuments(cond, (err, data)=>{
            if (err) return console.log(err);// cần phải có đoạn code này thì mới lấy được số lượng document
            // console.log(data);
            res(data);
        })
    })
}
var delay = (status) => {
    return new Promise( async (res, rej) =>{
        
        var i = 0;
        for(var item of statusFilter) {
            let cond = {};
            if (item.name !== 'all') cond = {status: item.name};
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
var statusButton = async (status)=>{
    
    // đếm số document của collection
    
    // delay(status).then(()=>{
    //     console.log(statusFilter);
    //     return statusFilter;
    // });
    var result = await delay(status);
    // console.log(result);
    return result;
    
}
// end tạo nút phân loại active inactive
module.exports = {
    statusButton: statusButton
}