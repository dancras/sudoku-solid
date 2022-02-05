import "./NumberPicker.css";
import { For } from "solid-js";
import { Signal } from "solid-js/types/reactive/signal";

export default function NumberPicker({ selectedNumber } : { selectedNumber: Signal<number> }) {
    const [getSelectedNumber, setSelectedNumber] = selectedNumber;

    const POSSIBLE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div class="NumberPicker">
            <div class="--Selection"
                style={{
                    "--selected": getSelectedNumber()
                }} 
                data-testid="number-picker-selection"
            ></div>
            <ul class="--Values">
                <For each={POSSIBLE_VALUES}>
                    {value => 
                        <li onClick={() => setSelectedNumber(value)} style={{ "--value": value }}>{value}</li>
                    }
                </For>
            </ul>
        </div>
    );

}