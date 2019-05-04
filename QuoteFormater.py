


while True:
    f= open("quotes.txt","a+")
    message = (input('Enter Message'))
    author = (input('Enter Author'))
    if (message == 'N'):
        break
        f.close()
    else:
        f.write( '\n{\n'+'"message":' + '"'+message+'"' + ',\n'+'"author":'+'"'+author+'"' +"\n},")

