import React, { useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

/* Components */
import { Button } from "@components/Button";
import { RawInput } from "@components/Input";
import { Text } from "@components/Typography";

/* Hooks */
import { useUniqueId } from "@src/hooks/useUniqueId";

/* Types */
import type { TableComponent } from "../types";

type Props = {
  children?: React.ReactNode;
} & TableComponent;

type ButtonProps = {
  idx: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  pageIndex: number;
};

type PaginationOverflowProps = {
  countArray: number[];
} & Omit<ButtonProps, "idx">;

export const Pagination: React.FC<Props> = (props) => {
  const { table } = props;
  const {
    state,
    setPageSize,
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = table;

  const countArray = useMemo(
    () => Array.from(new Array(pageCount).fill(0).map((_, i) => i)),
    [pageCount]
  );

  /* Keys */
  const pageNumberKey = useUniqueId("page-number-");

  return (
    <div className="flex w-1/2 justify-between">
      <div className="w-1-3 flex items-center gap-2">
        <Text>Rows per page:</Text>
        <RawInput
          variant="filled"
          name="display-row"
          value={state.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button disabled={canPreviousPage} iconButton>
          <ChevronLeftIcon fontSize={24} width={24} height={24} />
        </Button>
        {countArray.length < 10 ? (
          countArray.map((i) => (
            <PaginationButton
              key={pageNumberKey + i}
              gotoPage={table.gotoPage}
              idx={i}
              pageIndex={state.pageIndex}
            />
          ))
        ) : (
          <PaginationOverflow
            countArray={countArray}
            gotoPage={table.gotoPage}
            pageIndex={state.pageIndex}
          />
        )}
        <Button disabled={canNextPage} iconButton>
          <ChevronRightIcon fontSize={24} width={24} height={24} />
        </Button>
      </div>
    </div>
  );
};

const PaginationOverflow: React.FC<PaginationOverflowProps> = (props) => {
  const { countArray, ...rest } = props;

  let reducedArray: number[] = countArray.slice(2, countArray.length - 2);
  const pageNumberKey = useUniqueId("page-number-");

  return (
    <>
      <PaginationButton {...rest} idx={0} />
      <PaginationButton {...rest} idx={1} />
      <PaginationButton {...rest} idx={2} />
      {rest.pageIndex > 3 && rest.pageIndex < countArray.length - 3 && (
        <PaginationButton {...rest} idx={rest.pageIndex} />
      )}
      <PaginationButton {...rest} idx={countArray.length - 3} />
      <PaginationButton {...rest} idx={countArray.length - 2} />
      <PaginationButton {...rest} idx={countArray.length - 1} />
    </>
  );
};

const PaginationButton: React.FC<ButtonProps> = (props) => {
  const { gotoPage, idx, pageIndex } = props;
  return (
    <Button
      variant={idx === pageIndex ? "solid" : "outline"}
      color={idx === pageIndex ? "accent" : "primary"}
      onClick={() => gotoPage(idx)}
    >
      {idx + 1}
    </Button>
  );
};
