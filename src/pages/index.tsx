import "./reset.css";
import "./index.css";
import SudokuGrid from "~/components/SudokuGrid";
import NumberPicker from "~/components/NumberPicker";
import { createSignal } from "solid-js";

export default function Home() {
  const selectedNumber = createSignal(1);

  return (
    <div class="Sudoku">
      <SudokuGrid selectedNumber={selectedNumber} />
      <NumberPicker selectedNumber={selectedNumber} />
    </div>
  );
}
