"use strict";

/**
 * 整数の集合に関する組合せ nCk を生成します。
 * たとえば `combinations(4, 2)` の結果は
 * `[[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]` です。
 * 
 * @see https://qiita.com/kunimitaiyoh/items/05de1fdcad096a7022a0
 * @param {number} n 整数の集合の最大値。1 から n の集合に関する組合せが生成されます。
 * @param {number} k 組合せの元の数。
 * @returns {number[][]} 組合せ nCk 
 */
const combinations = (() => {
    const cons = (head, tail) => ({ head, tail });
    const list = (items) => {
        let l = null;
        for (let i = items.length - 1; i >= 0; i--) {
            l = cons(items[i], l);
        }
        return l;
    };
    const array = (items) => {
        const a = [];
        while (items !== null) {
            a.push(items.head);
            items = items.tail;
        }
        return a;
    };

    const matchList = (items, cases) =>
        (items === null) ? cases.nil() : cases.cons(items.head, items.tail);

    const range = (a, b) => {
        const nums = [];
        for (let i = a; i <= b; i++)
            nums.push(i);
        return list(nums);
    };

    return (n, k) => {
        const f = (i, nums) => matchList(nums, {
            nil: () => null,
            cons: (x, xs) => matchList(f(i + 1, xs), {
                nil: () => (x + k - i) > n ? null : range(x + 1, x + k - i),
                cons: (y, ys) => cons(x, cons(y, ys))
            })
        });

        const g = (nums) => matchList(nums, {
            nil: () => null,
            cons: (x, xs) => {
                const X = cons(x, xs);
                return cons(X, g(f(0, X)));
            }
        });
        return array(g(range(1, k))).map(array);
    };
})();

const [n, k] = process.argv.slice(2).map(x => parseInt(x));
console.log(combinations(n, k));
