let statusFilter = [
    {name: 'all', count: null, link: '#', class: 'default'},
    {name: 'active', count: null, link: '#', class: 'success'},
    {name: 'inactive', count: null, link: '#', class: 'warning'},
];
// đếm số document của collection
statusFilter.forEach((item, index) => {
    let cond = {};
    if (item.name !== 'all') cond = {status: item.name};
    ItemsModel.count(cond).then((data)=>{
        statusFilter[index].count = data;
    })
})
module.exports = {
    statusFilter: statusFilter
}