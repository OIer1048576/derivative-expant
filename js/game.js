            var ShopLv = [
                0, 0, 0, 0, 0  
            ];
            var ShopCost = [
                50, 300, 1500, 6000, 2e4
            ];
            var ShopMult = [
                0.01, 0.05, 0.10, 0.25, 0
            ];
            var DeltMult = [
                0, 0, 0, 0, 1e-6
            ]
            var dollar = new SuperNumber(1), increment =
            new SuperNumber(1);
                let time = new Date().getTime();
                let re = new RegExp("\s?" + "last" + "=([^;]+)(;|$)");
                let lst = parseInt((document.cookie.match(re) || [0, time])[1]);
                dollar = new SuperNumber(Math.max(1, parseFloat((document.cookie.match(new RegExp("\s?" + "Dollar" + "=([^;]+)(;|$)")) || [1, 1])[1])));
                ShopLv = eval((document.cookie.match(new RegExp("\s?" + "ShopLv" + "=([^;]+)(;|$)")) || [0, ShopLv])[1]);
                ShopCost = eval((document.cookie.match(new RegExp("\s?" + "ShopCost" + "=([^;]+)(;|$)")) || [0, ShopCost])[1]);
                console.log(time, lst, dollar.toString(), ShopLv, ShopCost);
                let diff = new SuperNumber((time-lst) / 1000);
                let delt = new SuperNumber(0);
                for (let i=0;i<4;++i) {
                    delt = delt.add(new SuperNumber(ShopLv[i]*ShopMult[i]*100));
                }
                console.log(time, lst, diff, delt);
                dollar = dollar.add(delt.mul(diff))


            var id = (s) => {return document.getElementById(s);};
            setInterval(() => {
                id("qwqwq").innerText = dollar.toString();
                for (let i=1;i<6;++i) {
                    id(`S${i}C`).innerText = ShopCost[i-1];
                    id(`S${i}L`).innerText = ShopLv[i-1];
                }
            })
            function Add() {
                dollar = dollar.add(increment);
            }
            function ShopUpgrade(i) {
                if (dollar.Base * (1e4**dollar.Exp) >= ShopCost[i-1]) {
                    dollar = dollar.sub(new SuperNumber(ShopCost[i-1]));
                    ShopCost[i-1] *= 1.1;
                    ShopCost[i-1] = Math.floor(ShopCost[i-1]);
                    ShopLv[i-1] ++;
                }
            }
            let tm = 0;
            setInterval(() => {
                tm ++;
                let newDate = new Date('1970-01-01 00:00:00').toUTCString();
                document.cookie = 'last=;expires=' + newDate + ';';
                document.cookie = 'ShopLv=;expires=' + newDate + ';';
                document.cookie = 'ShopCost=;expires=' + newDate + ';';
                document.cookie = 'Dollar=;expires=' + newDate + ';';
                let data = new Date().getTime();
                let str1 = `last=${data}`;
                let str2 = `ShopLv=[${ShopLv.toString()}]`;
                let str3 = `ShopCost=[${ShopCost.toString()}]`;
                let str4 = `Dollar=${dollar.Base * (1e4**dollar.Exp)}`;
                // console.log(str);
                document.cookie = str1;
                document.cookie = str2;
                document.cookie = str3;
                document.cookie = str4;
                var del = new SuperNumber(0);
                for (let i = 4; i < 5; i++) {
                    // console.log(i)
                    del = del.add(new SuperNumber(DeltMult[i] * ShopLv[i]));
                }
                del = del.mul(new SuperNumber(tm))
                dollar.add(del)
                // console.log(del)
                del.mul(new SuperNumber(tm));
                for (let i=0;i<4;++i) {
                    dollar = dollar.add(new SuperNumber(ShopLv[i]*ShopMult[i]));
                    del = del.add(new SuperNumber(ShopLv[i]*ShopMult[i]));
                }
                var awa = new SuperNumber(100);
                // console.log(del);
                id("speed").innerText = `(+${del.mul(awa)})`
            }, 10);
            function reset() {
                let newDate = new Date('1970-01-01 00:00:00').toUTCString();
                document.cookie = 'last=;expires=' + newDate + ';';
                document.cookie = 'ShopLv=;expires=' + newDate + ';';
                document.cookie = 'ShopCost=;expires=' + newDate + ';';
                document.cookie = 'Dollar=;expires=' + newDate + ';';
                location.reload();
            }