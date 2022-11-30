import logread

while(1):
    logread.read().recvDBC()
    
    logwrite.write().sendDBC()