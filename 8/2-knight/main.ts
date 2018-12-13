function makeChessBoard(M: number, N: number, x: number, y: number): number[][] {
    const mat: number[][] = [];

    for (let i = 0; i < M; i++) {
        mat[i] = [];

        for (let j = 0; j < N; j++) {
            mat[i][j] = -1;
        }
    }
    mat[x][y] = 1;

    return mat;
}

export function knight(M: number, N: number, startPosX: number, startPosY: number): number {
    const mat = makeChessBoard(M, N, 0, 0);

    function isPositionValid(i, j) {
        return (i >= 0) && (j >= 0) && (i < M) && (j < N);
    }

    function solve(i: number, j: number) {
        if (isPositionValid(i, j)) {
            if (mat[i][j] == -1)
                mat[i][j] = solve(i - 2, j - 1)
                    + solve(i - 2, j + 1)
                    + solve(i - 1, j - 2)
                    + solve(i + 1, j - 2);
        } else {
            return 0;
        }

        return mat[i][j];
    }

    return solve(M - 1, N - 1);
}