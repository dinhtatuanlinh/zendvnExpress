const ItemsModel = require('./../schemas/items');
var statusButton = (status)=>{
    let statusFilter = [
        {name: 'all', count: null, link: '#', class: 'default'},
        {name: 'active', count: null, link: '#', class: 'default'},
        {name: 'inactive', count: null, link: '#', class: 'default'},
    ];
    // đếm số document của collection
    statusFilter.forEach((item, index) => {
        let cond = {};
        statusFilter[0].class = 'active';
        if (item.name !== 'all') cond = {status: item.name};
        if (item.name === status) statusFilter[index].class = 'active';
        ItemsModel.count(cond).then((data)=>{
            statusFilter[index].count = data;
        })
    })
    return statusFilter
}

module.exports = {
    statusButton: statusButton
}