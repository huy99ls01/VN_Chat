let sum = (a, b) => { 
    return new Promise((resol, reject) => { 
        setTimeout(() => { 
            if (typeof a != "number" || typeof b != "number") { 
                return reject("sai tham so.");
            }
            resol(a + b);
        }, 1000)
    });
}

let test = async () => {
    try { 
        let total_1 = await sum(7, 10)
        console.log(total_1)
    }
    catch (err) {
        console.log(err)
 
    }
}

test();