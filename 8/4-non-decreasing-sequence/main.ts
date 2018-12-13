export function longestNonIncreasingSequence<T>(list: T[]): number {
    let max = 1;

    function _lis<T>(list: T[], n: number): number {
        if (n === 1) {
            return 1;
        }

        let maxEndingHere = 1;

        for (let i = 1; i < n; i++) {
            let res = _lis(list, i);

            // <= is here because of NON-DECREASING
            if (list[i - 1] <= list[n - 1] && res + 1 > maxEndingHere) {
                maxEndingHere = res + 1;
            }
        }

        max = Math.max(max, maxEndingHere);

        return maxEndingHere;
    }

    return _lis(list, list.length);
}
