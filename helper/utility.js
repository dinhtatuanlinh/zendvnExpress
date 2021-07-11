const ItemsModel = require('./../schemas/items');
let statusFilter = [
    {name: 'all', count: null, link: '#', class: 'default'},
    {name: 'active', count: null, link: '#', class: 'default'},
    {name: 'inactive', count: null, link: '#', class: 'default'},
];
var delay = (status) => {
    return new Promise((res, rej) =>{
        statusFilter.forEach((item, index) => {
            let cond = {};
            if (item.name !== 'all') cond = {status: item.name};
            if (item.name === status) statusFilter[index].class = 'success';
            ItemsModel.count(cond).then((data)=>{
                statusFilter[index].count = data;
            })
        })
        res(statusFilter);
    })
    
};
var statusButton = async (status)=>{
    
    // đếm số document của collection
    
    var result = await delay(status);
    console.log(result);
    return result;
    
}

module.exports = {
    statusButton: statusButton
}