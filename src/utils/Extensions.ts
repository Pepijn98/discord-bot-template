import { User, Member } from "eris";

/** Capitalize the first letter of a string */
String.prototype.capitalize = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/** Paginate over an array */
Array.prototype.paginate = function <T>(pageSize: number, pageNumber: number): T[] {
    --pageNumber;
    return this.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
};

/** Remove item from array (modifies the current array AND returns it) */
Array.prototype.remove = function <T>(item: T): T[] {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === item) this.splice(i, 1);
    }
    return this;
};

Object.defineProperty(User.prototype, "tag", {
    get: function () {
        return `${this.username}#${this.discriminator}`;
    }
});

Object.defineProperty(Member.prototype, "tag", {
    get: function () {
        return `${this.username}#${this.discriminator}`;
    }
});
