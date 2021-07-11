// tạo nút phân loại active inactive
const ItemsModel = require('./../schemas/items');
let statusFilter = [
    {name: 'all', num: null, link: '#', class: 'default'},
    {name: 'active', num: null, link: '#', class: 'default'},
    {name: 'inactive', num: null, link: '#', class: 'default'},
];
var count = (cond) =>{
    return new Promise((res, rej) =>{
        ItemsModel.count(cond, (data)=>{
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
            statusFilter[i].num = num;
            i++;
        }

    })
    
};
var statusButton = async (status)=>{
    
    // đếm số document của collection
    
    // delay(status).then(()=>{
    //     console.log(statusFilter);
    //     return statusFilter;
    // });
    await delay(status);
    console.log(statusFilter);
    return statusFilter;
    
}
// end tạo nút phân loại active inactive
module.exports = {
    statusButton: statusButton
}