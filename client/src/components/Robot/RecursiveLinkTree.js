import { LinkItem } from "./LinkItem";
import { Fragment } from "react";
export const RecursiveLinkTree = ({ listMeta }) => {
  const createTree = (branch) =>
    branch.branches && (
      <LinkItem link={branch.link} joint={branch.joint}>
        {branch.branches.map((branch, i) => {
          return <Fragment key={i}>{createTree(branch)}</Fragment>;
        })}
      </LinkItem>
    );

  return (
    <>
      {listMeta.map((branch, i) => (
        <Fragment key={i}>{createTree(branch)}</Fragment>
      ))}
    </>
  );
};
