import { NoteItem, Note } from "../models/noteModel";
import { checkExistingOrder, checkExistingOrderItem, checkNoteQuantity, validateNoteItem } from "../validation/noteValidation";
import { Order } from "../models/orderModel";
import fs from 'fs';

export function readNotes(): Note[] {
  const notesDir = './Notas'
  const noteFiles = fs.readdirSync(notesDir);
  const notes: Note[] = [];

  for (const file of noteFiles) {
    const noteContent = fs.readFileSync(`${notesDir}/${file}`, 'utf-8');
    const noteData = noteContent.trim().split('\n').map((line: string) => {
      const replacedLine = line
        .replace(/"id_pedido"/g, '"orderId"')
        .replace(/"número_item"/g, '"itemNumber"')
        .replace(/"quantidade_produto"/g, '"productQuantity"');

      const parsedLine = JSON.parse(replacedLine);
      return new NoteItem(
        parsedLine.orderId.toString(),
        parsedLine.itemNumber,
        parsedLine.productQuantity
      );
    });
    noteData.sort((a, b) => a.itemNumber - b.itemNumber);
    const note: Note = new Note(file.split('.')[0], noteData);
    notes.push(note);
  }

  return notes;
}

export function validateNotes(notes: Note[], orders: Order[]): void {

  notes.forEach((note) => {
    try {
   
      note.items.forEach((item: NoteItem) => {
        
        validateNoteItem(item);

        const order  = checkExistingOrder(item.orderId, orders)
        
        const correspondingOrder = checkExistingOrderItem(item.orderId, item.itemNumber, order);

        checkNoteQuantity(note, item, correspondingOrder, order);
     
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in note ${note.id}: ${error.message}`);
      }
    }
  })

}
