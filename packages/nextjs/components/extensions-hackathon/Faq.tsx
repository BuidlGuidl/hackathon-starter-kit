const faqData = [
  {
    question: "Who can participate in this hackathon?",
    answer: "Everyone! Developers of all skill levels are welcome to participate.",
  },
  {
    question: "What makes a good Scaffold-ETH 2 extension?",
    answer:
      "A good extension typically involves contract and front-end interaction. It should solve a real problem or enhance the developer experience. <br /><br />Examples include implementing your favourite EIP, adding a useful kit that extends Scaffold-ETH 2's capabilities or implementing a Solidity by Example application.<br /><br />You can check <a href='https://github.com/scaffold-eth/create-eth-extensions' target='_blank' rel='noopener noreferrer' class='underline'>our curated extensions branches</a> to get some inspiration: eip-712, erc-20, onchainkit, ponder or subgraph are extensions that are already available.",
  },
  {
    question: "How can I submit my extension?",
    answer:
      "You can send you submission in <a href='/submit' class='link'>the submission page</a>. You'll your code repository, a brief project description and a 2 minute video showcasing it.",
  },
  {
    question: "Can I submit more than one extension?",
    answer: "Yes, you can submit as many extensions as you want! But we encourage quality over quantity.",
  },
  {
    question: "Can I work in a team?",
    answer:
      "Yes, you can work individually or in teams. We encourage collaboration! Find your partners in <a href='https://t.me/+jgKFHjb9B_cyNmMx' target='_blank' rel='noopener noreferrer' class='underline'>telegram</a>",
  },
  {
    question: "How will projects be judged?",
    answer:
      "Projects will be evaluated by a commitee based on innovation, technical complexity, use of Scaffold-ETH 2 capabilities, and potential impact to the ecosystem.",
  },
  {
    question: "Will there be mentors or technical support available?",
    answer:
      "Yes, we'll have mentors and technical support available throughout the hackathon to assist participants. <br />Scaffold-ETH 2 documentation, tutorials, and a <a href='https://t.me/+jgKFHjb9B_cyNmMx' target='_blank' rel='noopener noreferrer' class='underline'>dedicated support channel</a> are available.",
  },
  {
    question: "Is there a registration fee?",
    answer: "No, participation in the hackathon is free of charge.",
  },
  {
    question: "Do I need to know Solidity or other tech stack to participate?",
    answer:
      "You can create a useful Scaffold-ETH 2 extension even without a contract! <br />We'd recommend doing some challenges of <a href='https://speedrunethereum.com/' target='_blank' rel='noopener noreferrer' class='underline'>SpeedRunEthereum</a> to get familiar with Scaffold-ETH 2, but totally fine if you can't!",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

export const Faq = () => {
  return (
    <div className="flex flex-col w-full items-center border border-1 border-t-0 border-black pb-20">
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
            <div className="collapse-content ml-4">
              <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
            </div>
            {index !== faqData.length - 1 && <div className="border-b border-black"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
