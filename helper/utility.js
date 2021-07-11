const ItemsModel = require('./../schemas/items');
var statusButton = (status)=>{
    let statusFilter = [
        {name: 'all', count: null, link: '#', class: 'default'},
        {name: 'active', count: null, link: '#', class: 'default'},
        {name: 'inactive', count: null, link: '#', class: 'default'},
    ];
    // đếm số document của collection
    var delay = async() => {
        statusFilter.forEach((item, index) => {
            let cond = {};
            if (item.name !== 'all') cond = {status: item.name};
            if (item.name === status) statusFilter[index].class = 'success';
            ItemsModel.count(cond).then((data)=>{
                statusFilter[index].count = data;
                console.log(statusFilter[index]);
            })
        })
    };
    delay().then(async() => {
        console.log(statusFilter);
        return statusFilter;
    });
    
}

module.exports = {
    statusButton: statusButton
}