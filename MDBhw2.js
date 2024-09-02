// 1; Вывести не заблокированных юзеров не из China с положительным балансом, используя метод aggregate()

db.users.aggregate([
    {
        $match: {
            is_blocked: { $ne: true },
            country: { $ne: "China" }, 
            balance: { $gt: 0 } 
        }
    },
    {
        $project: {
            _id: 0,
            fullname: 1, 
            country: 1,
            balance: 1
        }
    }
])


// 2. Вывести имена и баланс трех случайных не заблокированных юзеров из USA и France в порядке убывания баланса, используя метод aggregate()

db.users.aggregate([
    {
        $match: {
            is_blocked: { $ne: true }, 
            country: { $in: ["USA", "France"] } 
        }
    },
    {
        $sample: { size: 100 } 
    },
    {
        $sort: { balance: -1 }  
    },
    {
        $limit: 3 
    },
    {
        $project: {
            _id: 0, 
            fullname: 1,  
            balance: 1  
        }
    }
])


// 3.Разблокировать всех юзеров с положительным балансом

db.users.updateMany(
    {
        balance: { $gt: 0 } 
    },
    {
        $set: { is_blocked: false }  
    }
)