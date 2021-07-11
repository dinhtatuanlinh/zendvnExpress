const ItemsModel = require('./../schemas/items');
let statusFilter = [
    {name: 'all', count: null, link: '#', class: 'default'},
    {name: 'active', count: null, link: '#', class: 'default'},
    {name: 'inactive', count: null, link: '#', class: 'default'},
];
var delay = () => {
    return new Promise((res, rej) =>{
        statusFilter.forEach((item, index) => {
            let cond = {};
            if (item.name !== 'all') cond = {status: item.name};
            if (item.name === status) statusFilter[index].class = 'success';
            ItemsModel.count(cond).then((data)=>{
                statusFilter[index].count = data;
            })
        })
    })
    
};
var statusButton = async (status)=>{
    
    // đếm số document của collection
    
    await delay();
    console.log(statusFilter);
    return statusFilter;
    
}

module.exports = {
    statusButton: statusButton
}