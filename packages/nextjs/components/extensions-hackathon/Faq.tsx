const faqData = [
  {
    question: "What's SE-2?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What are SE-2 extensions?",
    answer:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "What do I have to do to participate?",
    answer:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Are there any rules for the extension?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    question: "What makes a good extension?",
    answer:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

export const Faq = () => {
  return (
    <div className="flex flex-col items-center border border-1 border-t-0 border-black pb-20">
      <div className="md:w-1/2 md:mb-12">
        <h2 className="text-4xl my-12 text-center">FAQ</h2>
        {faqData.map((item: FaqItem, index) => (
          <div key={index} tabIndex={0} className="collapse mb-2 relative">
            <input type="checkbox" className="peer" />
            <div className="collapse-title ml-4 flex justify-between items-center">
              {item.question}
              <svg
                width="41"
                height="19"
                viewBox="0 0 41 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition-transform duration-200 peer-checked:rotate-180 scale-75"
              >
                <path d="M1.12109 1.37894L20.1521 17.032L39.5001 1.11816" stroke="#182232" strokeWidth="2" />
              </svg>
            </div>
            <div className="collapse-content">
              <p>{item.answer}</p>
            </div>
            <div className="border-b border-black"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
