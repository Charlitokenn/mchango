import { ArrowLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MessageChat = ({sms,state}: {sms: string, state: boolean}) => {
  const formattedSMS = sms?.replace(/\n/g, "  \n");

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
        }}>
          <p style={{
            margin: 0,
            fontSize: '16px',
            lineHeight: '1.5'
          }}
            hidden={state ? true : false}
          >
            <ReactMarkdown>
             {formattedSMS}
            </ReactMarkdown>
          </p>
        </div>
      </div>

      {/* Message Input */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #eee',
        backgroundColor: 'white'
      }}>
        <div
          style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '24px',
          padding: '8px 16px'
         }}
         hidden
        >
          <input
            type="text"
            placeholder="Type message"
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              flex: 1,
              fontSize: '16px'
            }}
          />
          <ChevronRight style={{
            color: '#666',
            cursor: 'pointer'
          }} />
        </div>
      </div>
    </div>   
  );
};

export default MessageChat;