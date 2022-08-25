import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('lakomy_4ib1.db')

export default class Database{


    static async insert(hour, week, vib, title){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = "INSERT INTO alarms (hour, title, active, repeat, sound, vibration, mon, tue, wed, thu, fri, sat, sun) VALUES ('"+hour+"', '"+title+"',1,0, 'default', "+vib+", "+week[0]+" ,"+week[1]+" ,"+week[2]+" ,"+week[3]+" ,"+week[4]+" ,"+week[5]+" ,"+week[6]+"); "
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static async updateHour(hour, id){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = "UPDATE alarms SET hour='"+hour+"' WHERE id="+id+"; "
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static async disable(id){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = "UPDATE alarms SET active=0 WHERE id="+id+"; "
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static async updateActive(active, id){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = "UPDATE alarms SET active='"+active+"' WHERE id="+id+"; "
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static async delete(id){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = "DELETE FROM alarms WHERE id="+id+"; "
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static async update(alarm){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = `UPDATE alarms SET hour='${alarm.hour}', title='${alarm.title}', active=${alarm.active}, vibration=${alarm.vibration}, mon=${alarm.repeat[0]}, tue=${alarm.repeat[1]}, wed=${alarm.repeat[2]}, thu=${alarm.repeat[3]}, fri=${alarm.repeat[4]}, sat=${alarm.repeat[5]}, sun=${alarm.repeat[6]} WHERE id=${alarm.id}`
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static async get(){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                let query = "SELECT * FROM alarms;"
                tx.executeSql(query, [],
                    (tx, results)=>{
                        resolve(JSON.stringify(results))
                    },
                    (tx, error)=>{
                        reject(error)
                    }
                )
            })
        })
    }

    static create(){
        db.transaction(tx=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms (id integer primary key not null, hour text, title text, active integer, repeat integer, sound text, vibration integer, mon integer, tue integer, wed integer, thu integer, fri integer, sat integer, sun integer);"
            );
        }) 
    }
}