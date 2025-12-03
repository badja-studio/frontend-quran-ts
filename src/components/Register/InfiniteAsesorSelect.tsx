import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api, ApiResponse } from "../../services/api.config";
import { Asesor, AssessorPage } from "./types";
import { useEffect, useRef, useState } from "react";

interface AssessorApiResponse extends ApiResponse<Asesor[]> {
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

interface Props {
  label: string;
  value: Asesor | null;
  onChange: (v: Asesor | null) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function InfiniteAsesorSelect({
  label,
  value,
  onChange,
  disabled,
  required = false,
}: Props) {
  const listboxRef = useRef<HTMLUListElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<AssessorPage>({
    queryKey: ["asesor-infinite", debouncedSearch],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<Asesor[]>("/api/assessors", {
        params: {
          page: pageParam,
          limit: 10,
          search: debouncedSearch || undefined,
        },
      }) as AssessorApiResponse;

      // Backend returns: { success, message, data: Asesor[], pagination: {...} }
      // The pagination is at the root level, not nested inside data
      return {
        data: res.data || [],
        pagination: res.pagination || {
          current_page: 1,
          per_page: 10,
          total: 0,
          total_pages: 1,
        },
      };
    },
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.pagination;
      if (current_page < total_pages) {
        return current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into single array
  const options = data?.pages.flatMap((page) => page.data) ?? [];

  // Handle scroll to load more
  useEffect(() => {
    const listbox = listboxRef.current;
    if (!listbox) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = listbox;
      // Load more when scrolled to 80% of the list
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    listbox.addEventListener("scroll", handleScroll);
    return () => listbox.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Autocomplete
      disabled={disabled}
      value={value ?? null}
      onChange={(_, v) => {
        onChange(v ?? null);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      loading={isLoading}
      getOptionLabel={(o) => {
        return o?.name ?? "";
      }}
      isOptionEqualToValue={(o, v) => o?.id === v?.id}
      ListboxProps={{
        ref: listboxRef,
        style: { maxHeight: "300px" },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetchingNextPage ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
