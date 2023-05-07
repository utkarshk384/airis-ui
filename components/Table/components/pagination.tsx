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
    nextPage,
    previousPage,
  } = table;

  const countArray = useMemo(
    () => Array.from(new Array(pageCount).fill(0).map((_, i) => i)),
    [pageCount]
  );

  /* Keys */
  const pageNumberKey = useUniqueId("page-number-");

  return (
    <div className="grid w-full grid-cols-3 justify-items-center">
      <div className="w-1-3 flex justify-self-start items-center gap-2">
        <Text>Rows per page:</Text>
        <RawInput
          variant="filled"
          name="display-row"
          value={state.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={!canPreviousPage}
          iconButton
          onClick={() => previousPage()}
        >
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
        <Button disabled={!canNextPage} iconButton onClick={() => nextPage()}>
          <ChevronRightIcon fontSize={24} width={24} height={24} />
        </Button>
      </div>
    </div>
  );
};

const PaginationOverflow: React.FC<PaginationOverflowProps> = (props) => {
  const { countArray, ...rest } = props;

  const DISPLAY_ITEMS = useMemo(() => 2, []);

  let reducedArray: number[] = useMemo(() => {
    if (rest.pageIndex <= DISPLAY_ITEMS)
      return countArray.slice(0, DISPLAY_ITEMS * 2);
    else if (rest.pageIndex >= countArray.length - DISPLAY_ITEMS)
      return countArray.slice(
        rest.pageIndex - DISPLAY_ITEMS,
        countArray.length
      );

    return countArray.slice(rest.pageIndex - 1, rest.pageIndex + DISPLAY_ITEMS);
  }, [DISPLAY_ITEMS, countArray, rest.pageIndex]);

  const pageNumberKey = useUniqueId("page-number-");

  return (
    <>
      {rest.pageIndex > DISPLAY_ITEMS && <PaginationButton {...rest} idx={0} />}
      {reducedArray.map((i) => (
        <PaginationButton key={pageNumberKey + i} {...rest} idx={i} />
      ))}
      {rest.pageIndex < countArray.length - DISPLAY_ITEMS && (
        <PaginationButton {...rest} idx={countArray.length - 1} />
      )}
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
