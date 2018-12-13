export function lps(sequense: string): number {
    function _lps(seq: string, i: number, j: number): number {
        // Base Case 1: If there is only 1 character
        if (i === j) {
            return 1;
        }

        // Base Case 2: If there are only 2 characters and both are same
        if (seq[i] === seq[j] && i + 1 === j) {
            return 2;
        }

        // If the first and last characters match
        if (seq[i] === seq[j]) {
            return _lps(seq, i + 1, j - 1) + 2;
        }

        // If the first and last characters do not match
        return Math.max(_lps(seq, i, j - 1), _lps(seq, i + 1, j));
    }

    return _lps(sequense, 0, sequense.length - 1);
}