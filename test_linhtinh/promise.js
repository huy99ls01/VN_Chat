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

sum(10, 4)
    .then((total) => sum(total, 10))
    .then((total2) => sum(total2, 10))
    .catch((err) => { 
        console.log(err)
    })
