interface ReturnType {
  readonly grade: number;
  readonly class: number;
  readonly number: number;
}

const convertSchoolNumber = (n: string): ReturnType => {
  const grade = n.slice(0, 1);
  const clazz = n.slice(1, 3);
  const realClass = clazz[0] === '0' ? clazz.replace('0', '') : clazz;
  const number = n.slice(3, 5);
  const realNumber = number[0] === '0' ? number.replace('0', '') : number;

  return {
    grade: parseInt(grade, 10),
    class: parseInt(realClass, 10),
    number: parseInt(realNumber, 10)
  };
};

export default convertSchoolNumber;
