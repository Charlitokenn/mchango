import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MessageChat = ({sms,state,isCustomMessage}: {sms: string, state: boolean, isCustomMessage: boolean}) => {
  const formattedSMS = sms?.replace(/\n/g, "  \n");
  const [inputText, setInputText] = useState('');
  const formattedInputText = useMemo(() => inputText.replace(/\n/g, "  \n"), [inputText]);

  return (
    <div 
      style={{
        maxWidth: '400px',
        margin: '20px auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        height: '600px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        backgroundColor: '#030e4f',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <ArrowLeft style={{ 
          color: 'white',
          cursor: 'pointer'
        }} />
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#666',
          borderRadius: '50%'
        }} />
        <span style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '500'
        }}>
          MchangoApp
        </span>
      </div>

      {/* Chat Content */}
      <div style={{
        flex: 1,
        padding: '16px',
        backgroundColor: '#f5f5f5',
        overflowY: 'auto'
      }}>
        <div style={{
          backgroundColor: '#e9e9e9',
          padding: '16px',
          borderRadius: '12px',
          maxWidth: '80%',
          margin: '8px 0'
        }}
        hidden={state ? true : false}>
          <p style={{
            margin: 0,
            fontSize: '16px',
            lineHeight: '1.5'
          }}
            
          >
            <ReactMarkdown>
             {formattedSMS}
            </ReactMarkdown>
          </p>
        </div>
        {/* Div for Custom Message */}
        <div style={{
          backgroundColor: '#e9e9e9',
          padding: '16px',
          borderRadius: '12px',
          maxWidth: '80%',
          margin: '8px 0'
        }}
        hidden={isCustomMessage}>
          {formattedInputText && (
            <p style={{
              margin: 0,
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              <ReactMarkdown>
                {formattedInputText}
              </ReactMarkdown>
            </p>
          )}
        </div>        
      </div>

      {/* Message Input */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #eee',
        backgroundColor: 'white'
      }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '24px',
            padding: '8px 16px',
            flexDirection: 'column'
          }}
          hidden={!isCustomMessage}
        >
          <textarea
            placeholder="Type message"
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              flex: 1,
              fontSize: '16px',
              width: '100%',
              resize: 'none',
              overflow: 'hidden'
            }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <ChevronRight style={{
            color: '#666',
            cursor: 'pointer',
            alignSelf: 'flex-end',
            marginTop: '8px',
          }} />
        </div>
      </div>
    </div>   
  );
};

export default MessageChat;