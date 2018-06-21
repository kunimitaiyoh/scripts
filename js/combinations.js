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
    /**
     * @param {number} a
     * @param {number} b
     * @return {number[]}
     */
    const range = (a, b) => {
        const nums = [];
        for (let i = a; i <= b; i++)
            nums.push(i);
        return nums;
    };

    return (n, k) => {
        /**
         * 
         * @param {number} i 
         * @param {number[]} nums 
         * @return {number[]}
         */
        const f = (i, nums) => {
            if (nums.length === 0) {
                return [];
            } else {
                const x = nums[0];
                const xs = nums.slice(1);
                const ys = f(i + 1, xs);
                if (ys.length === 0)
                    return (x + k - i > n) ? [] : range(x + 1, x + k - i);
                else
                    return [x].concat(ys);
            }
        };

        /**
         * @param {number[]} nums 
         * @returns {number[][]}
         */
        const g = (nums) => {
            if (nums.length === 0)
                return [];
            else
                return [nums].concat(g(f(0, nums)));
        };

        return g(range(1, k));
    };
})();

const [n, k] = process.argv.slice(2).map(x => parseInt(x));
console.log(combinations(n, k));
