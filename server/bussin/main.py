import logread
import logwrite

while(1):
    logread.read().recvDBC()
    
    logwrite.write().sendDBC()
