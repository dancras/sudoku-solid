import "./SudokuGrid.css";
import { Accessor, Setter, Signal } from "solid-js/types/reactive/signal";
import { createSignal, For } from "solid-js";

type Answer = [number, boolean];

class DummyCell {
    // Given answer and whether it is valid
    contents: Accessor<Answer | null>;
    setContents: Setter<Answer | null>;

    // A record for each of the 9 candidates. If a candidate is added, returns boolean
    // for its validity, otherwise null to leave blank
    candidates: Record<number, Accessor<boolean | null>>;
    setCandidates: Record<number, Setter<boolean | null>>;

    constructor() {
        [this.contents, this.setContents] = createSignal(null);

        const candidateSignales = Array.from({length: 9}).map(() => createSignal(null));
        this.candidates = candidateSignales.map(s => s[0]);
        this.setCandidates = candidateSignales.map(s => s[1]);
    }

    toggleContents(n: number) {
        this.setContents(
            this.contents() && this.contents()[0] === n ? null : [n, true]
        );
    }

    toggleCandidate(n: number) {
        const i = n - 1;
        this.setCandidates[i](this.candidates[i]() === null ? true : null);
    }
}

const candidateIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function SudokuGrid({ selectedNumber } : { selectedNumber: Signal<number> }) {
    const cells = Array.from({length: 81}).map(() => new DummyCell())
    const [getSelectedNumber] = selectedNumber; 

    return (
        <div class="SudokuGrid">
            <For each={cells}>
                {(cell) =>
                    <div class="--Cell"
                        classList={{
                            '-ShowingCandidates': !cell.contents(),
                            '-ShowingContents': !!cell.contents()
                        }}
                        onClick={() => cell.toggleCandidate(getSelectedNumber())}
                        onDblClick={() => cell.toggleContents(getSelectedNumber())}
                    >
                        <div class="--Candidates">
                            <For each={candidateIndexes}>
                                {(i) =>
                                    <div class="--Candidate">{ cell.candidates[i]() === null ? ' ' : i + 1 }</div>
                                }
                            </For>
                        </div>
                        <div class="--Contents">
                            {cell.contents() ? cell.contents()[0] : ''}
                        </div>
                    </div>
                }
            </For>
        </div>
    );
  }