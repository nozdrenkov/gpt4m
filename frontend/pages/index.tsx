import { useEffect, useState, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { FaCog } from "react-icons/fa";

const _BACKEND_URL = "http://localhost:5555/query";

type ResponseData = {
  source: string;
  page_content: string;
  relevance: number;
};

type ErrorData = {
  error: string;
};

const createErrorMessage = (error: any) => {
  let errorText =
    "Error fetching results... \n" + "Maybe backend script isn't running?\n";

  errorText += "\n------------------\n";
  if (
    (error as any).response &&
    (error as any).response.data &&
    (error as any).response.data.error
  ) {
    errorText +=
      "error.response.data.error:\n" +
      JSON.stringify((error as any).response.data.error, null, 2);
  }

  errorText += "\n------------------\n";
  errorText += "error:\n" + JSON.stringify(error, null, 2);

  errorText += "\n------------------\n";
  if ((error as any).response) {
    errorText +=
      "error.response:\n" + JSON.stringify((error as any).response, null, 2);
  }

  return errorText;
};

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [error, setError] = useState<string>("");
  const [isInstantSearch, setIsInstantSearch] = useState(false);

  useEffect(() => {
    const instantSearchSetting = localStorage.getItem("isInstantSearch");
    if (instantSearchSetting !== null) {
      setIsInstantSearch(instantSearchSetting === "true");
    }
  }, []);

  useEffect(() => {
    if (router.query.search) {
      setQuery(router.query.search as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (isInstantSearch) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    if (query !== "") {
      try {
        const result = await axios({
          url: _BACKEND_URL,
          method: "post",
          data: {
            query: query,
            top: 3,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        setResponses(result.data);
        setError("");
      } catch (error) {
        setError(createErrorMessage(error));
        setResponses([]);
      }
    } else {
      setResponses([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (isInstantSearch) {
      router.push(`/?search=${encodeURIComponent(e.target.value)}`, undefined, {
        shallow: true,
      });
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isInstantSearch) {
      fetchResults();
    }
  };

  return (
    <main className="flex flex-col items-center h-screen p-4 bg-gray-100 relative">
      <Link href="/settings">
        <button className="absolute top-4 right-4 p-2">
          <FaCog className="text-gray-500 text-2xl hover:text-gray-700" />
        </button>
      </Link>
      <div className="mb-4 w-full max-w-4xl flex items-center justify-between">
        <div className="flex items-center w-full">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full p-2 text-xl border rounded-l-md outline-none transition duration-150 ease-in-out"
            id="search-input"
            placeholder="Search..."
          />
          {!isInstantSearch && (
            <button
              onClick={fetchResults}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-r-md"
            >
              Search
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="w-full max-w-4xl mx-auto mb-4 bg-red-500 text-white rounded-md p-4">
          <pre className="whitespace-pre">{error}</pre>
        </div>
      )}
      {responses.map((response, index) => (
        <div
          key={index}
          className="w-full max-w-4xl mx-auto mb-4 bg-white rounded-xl p-4 overflow-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl text-gray-800 font-bold">
              {response.source}
            </h2>
            <span className="text-lg text-blue-500">
              {response.relevance.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-700 overflow-wrap break-word">
            {response.page_content}
          </p>
        </div>
      ))}
    </main>
  );
}
