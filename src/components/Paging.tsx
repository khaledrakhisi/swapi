import { Button } from "./Button";

import classes from "./Paging.module.scss";

export const Paging = () => {
  return (
    <section className={classes.paging}>
      <Button outline>Previous</Button>
      <p>Page 1</p>
      <Button outline>Next</Button>
    </section>
  );
};
