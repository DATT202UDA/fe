import ReactMarkdown from 'react-markdown';
import { Flag } from './ChatWidget';

export interface Message {
  _id: string;
  session_id: string;
  sender: 'user' | 'bot';
  text: string;
  type: string;
  is_markdown: boolean;
  flag: Flag | null;
  reply_to: Message | null;
  timestamp: string;
  metadata: any;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MessageMarkdown = ({ message }: { message: Message }) => {
  const markdownComponents = {
    img: ({ node, ...props }: any) => (
      <div className="my-2">
        <img
          {...props}
          className="rounded-lg w-full max-w-[180px] h-auto object-cover shadow-sm hover:shadow transition-shadow duration-300"
          loading="lazy"
        />
      </div>
    ),
    a: ({ node, children, href, ...props }: any) => {
      const isProductLink = href?.includes('/san-pham/');
      const isViewDetailLink = children?.toString().includes('Xem chi tiết');

      if (isProductLink && !isViewDetailLink) {
        return (
          <div className="bg-[#FDFBF8] p-3 rounded-lg border border-[#E6A15A]/10 hover:border-[#E6A15A]/30 shadow-sm hover:shadow transition-all duration-300 mb-3">
            <a
              href={href}
              {...props}
              className="text-[#5C3D2E] hover:text-[#B86B2B] font-medium no-underline text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          </div>
        );
      }

      if (isViewDetailLink) {
        return (
          <a
            href={href}
            {...props}
            className="inline-flex items-center gap-1 text-[#B86B2B] hover:text-[#E6A15A] transition-colors no-underline text-sm font-medium mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }

      return (
        <a
          href={href}
          {...props}
          className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    p: ({ node, children, ...props }: any) => {
      const hasImage =
        Array.isArray(children) &&
        children.some((child: any) => child?.type?.name === 'img');

      return (
        <p
          {...props}
          className={`${
            hasImage ? 'my-2' : 'mb-2 last:mb-0'
          } leading-relaxed text-sm`}
        >
          {children}
        </p>
      );
    },
    strong: ({ node, ...props }: any) => (
      <strong {...props} className="font-medium text-[#5C3D2E]" />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 {...props} className="text-base font-semibold text-[#5C3D2E] mb-2" />
    ),
    ul: ({ node, ...props }: any) => (
      <ul {...props} className="space-y-1 my-2 list-none pl-0" />
    ),
    li: ({ node, ...props }: any) => (
      <li
        {...props}
        className="flex items-baseline gap-1.5 text-gray-600 text-sm"
      >
        <span className="text-[#E6A15A] text-xs">•</span>
        <span>{props.children}</span>
      </li>
    ),
    hr: ({ node, ...props }: any) => (
      <hr {...props} className="my-3 border-t border-[#E6A15A]/10" />
    ),
  };

  return (
    <div
      key={message._id}
      className={`flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      } mb-2`}
    >
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 ${
          message.sender === 'user'
            ? 'bg-[#E6A15A] text-white'
            : 'bg-white shadow-sm border border-gray-100 text-gray-800'
        }`}
      >
        {message.sender === 'bot' ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown components={markdownComponents}>
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm">{message.text}</p>
        )}
        <div
          className={`text-[10px] mt-1 ${
            message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageMarkdown;
