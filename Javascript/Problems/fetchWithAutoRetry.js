function fetchWithAutoRetryVariant1(fetcher, count) {
    const fetchData = async () => {
        try {
            const resp = await fetcher();
            console.log(resp)
        } catch(error) {
            console.log(error)
            fetchWithAutoRetry(fetcher, count - 1);
        }
        
    }
    if(count > 0) {
        fetchData();
    }
}


function fetcher() {
    let count = 0;
    return function() {
        return new Promise(function (resolve,reject){
            count++;
            setTimeout(() => {
                if(count == 5)
                    resolve('resolve')
                else
                    reject('rejected')
            }, 2000);
        })
    }
}

// fetchWithAutoRetryVariant1(fetcher(), 5)

// Another way
async function fetchWithAutoRetryVariant2(fetcher, count) {
    try {
        let resp = await fetcher();
        console.log(resp)
        return resp;
    } catch(error) {
        console.log(error)
        if(count == 0)
            throw error;
        
        return fetchWithAutoRetryVariant2(fetcher, count - 1);
    }
}

fetchWithAutoRetryVariant2(fetcher(), 5);


// bigfrontend.dev
// 64