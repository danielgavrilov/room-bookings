// TODO check if this covers all
const reClosed = /(UCL|Room|Rm\.)\sClosed/i;

export default function closed(booking) {
  const { contact, description } = booking;
  return reClosed.test(contact) || reClosed.test(description);
}
