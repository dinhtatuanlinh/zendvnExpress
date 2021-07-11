const ItemsModel = require('./../schemas/items');
let statusFilter = [
    {name: 'all', count: null, link: '#', class: 'default'},
    {name: 'active', count: null, link: '#', class: 'default'},
    {name: 'inactive', count: null, link: '#', class: 'default'},
];
var delay = (status) => {
    return new Promise((res, rej) =>{
        for(var item of statusFilter) {
            let cond = {};
            if (item.name !== 'all') cond = {status: item.name};
            if (item.name === status) statusFilter[index].class = 'success';
            ItemsModel.count(cond).then((data)=>{
                statusFilter[index].count = data;
            })
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
    return statusFilter;
    
}

module.exports = {
    statusButton: statusButton
}