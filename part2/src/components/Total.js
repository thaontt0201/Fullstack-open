const Total = ({ course }) => {
  const sum = course.parts
    .map((part) => {
      return part.exercises;
    })
    .reduce((a, b) => a + b);
  return <p style={{ fontWeight: "bold" }}>Number of exercises {sum}</p>;
};

export default Total;
