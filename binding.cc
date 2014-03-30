#include <node.h>
#include <v8.h>

#include <bcm_host.h>

using namespace v8;

static VCHI_INSTANCE_T vchi;
static VCHI_CONNECTION_T *vchi_connections;

static char buf[1024];

Handle<Value> Request(const Arguments& args) {
    HandleScope scope;

    String::AsciiValue str(args[0]);

    if(vc_gencmd_send(*str) != 0) {
        ThrowException(Exception::Error(String::New("Failed to send request")));
        return scope.Close(Undefined());
    }

    if(vc_gencmd_read_response(buf, 1024) != 0) {
        ThrowException(Exception::Error(String::New("Failed to read response")));
        return scope.Close(Undefined());
    }

    return scope.Close(String::New(buf));
}

Handle<Value> Disconnect(const Arguments& args) {
    HandleScope scope;
    vc_gencmd_stop();
    if(vchi_disconnect(vchi) != 0)
        ThrowException(Exception::Error(String::New("VCHI disconnect failed")));

    return scope.Close(Undefined());
}

void Init(Handle<Object> exports) {
    bcm_host_init();
    vcos_init();
   
    if(vchi_initialise(&vchi) != 0)
        ThrowException(Exception::Error(String::New("VCHI initialization failed")));

    if(vchi_connect(NULL, 0, vchi) != 0)
        ThrowException(Exception::Error(String::New("VCHI connection failed")));

    vc_vchi_gencmd_init(vchi, &vchi_connections, 1);

    /*
        Exports
     */
    exports->Set(String::NewSymbol("request"),
        FunctionTemplate::New(Request)->GetFunction());

    exports->Set(String::NewSymbol("disconnect"),
        FunctionTemplate::New(Disconnect)->GetFunction());
}

NODE_MODULE(binding, Init)
