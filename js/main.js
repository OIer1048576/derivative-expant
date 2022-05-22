function log10000(x) {
    return Math.log(x)/Math.log(10000)
}
Danwei = ["", "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载",
    "恒河沙", "阿僧袛", "那由它", "不可思议", "无量", "大数"]

class SuperNumber {
	constructor(arg, arg2=null) {
		if (arg2 === null) {
            if (arg === 0) {
                this.Base = 0;
                this.Exp = 0;
                return;
            }
			this.Exp = Math.floor(log10000(arg));
			this.Base = arg/(10000**(this.Exp));
		} else {
            arg2 += Math.floor(log10000(arg));
            this.Base = arg/(10000**(Math.floor(log10000(arg))));
            this.Exp = arg2;
        }
	}
	toString() {
		return (Math.round(this.Base*100)/100)
        .toString() + Danwei[this.Exp];
	}
	add(other) {
		if (other instanceof SuperNumber) {
            if (other.Base === 0) return this;
            if (this.Base === 0) return other;
			if (other.Exp == this.Exp) {
                return new SuperNumber(this.Base + other.Base, this.Exp);
			}
            else if (other.Exp > this.Exp){
                return new SuperNumber(this.Base / 10000 ** (this.Exp - other.Exp) + other.Base, this.Exp);
			}
            else {
                return new SuperNumber(this.Base * 10000 ** (this.Exp - other.Exp) + other.Base, other.Exp);
            }
        }
        return new SuperNumber(0);
	}
    sub(other) {
        if (other instanceof SuperNumber) {
        	if (other.Exp == this.Exp) {
                return new SuperNumber(this.Base - other.Base, this.Exp);
        	}
            else if (other.Exp > this.Exp){
                return new SuperNumber(this.Base / 10000 ** (this.Exp - other.Exp) - other.Base, this.Exp);
        	}
            else {
                return new SuperNumber(this.Base * 10000 ** (this.Exp - other.Exp) - other.Base, other.Exp);
            }
        }
        return new SuperNumber(0);
    }
    mul(other) {
        if (other instanceof SuperNumber) {
            if (!other.Base || !this.Base) return new SuperNumber(0);
            return new SuperNumber(this.Base * other.Base, this.Exp + other.Exp);
        }
    }
}
x = new SuperNumber(0, 0);
y = new SuperNumber(200, 0);
console.log(x.mul(y));
