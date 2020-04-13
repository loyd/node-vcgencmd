#include <nan.h>

#include <bcm_host.h>


static VCHI_INSTANCE_T vchi;
static VCHI_CONNECTION_T *vchi_connections;

static char buf[1024];

NAN_METHOD(Request) {
    assert(info.Length() >= 1);
    assert(info[0]->IsString());

#if NODE_MODULE_VERSION >= 72
    v8::String::Utf8Value str(v8::Isolate::GetCurrent(), info[0]);
#else
    v8::String::Utf8Value str(info[0]);
#endif

    if (vc_gencmd_send(*str) != 0) {
        Nan::ThrowError("Failed to send request");
        return;
    }

    if (vc_gencmd_read_response(buf, 1024) != 0) {
        Nan::ThrowError("Failed to read response");
        return;
    }

    info.GetReturnValue().Set(Nan::New(buf).ToLocalChecked());
}

NAN_METHOD(Disconnect) {
    vc_gencmd_stop();

    if (vchi_disconnect(vchi) != 0)
        Nan::ThrowError("VCHI disconnect failed");

    info.GetReturnValue().Set(Nan::Undefined());
}

NAN_MODULE_INIT(Init) {
    bcm_host_init();
    vcos_init();
   
    if (vchi_initialise(&vchi) != 0)
        Nan::ThrowError("VCHI initialization failed");

    if (vchi_connect(NULL, 0, vchi) != 0)
        Nan::ThrowError("VCHI connection failed");

    vc_vchi_gencmd_init(vchi, &vchi_connections, 1);

    /*
        Exports
     */
    Nan::Set(target, Nan::New("request").ToLocalChecked(),
        Nan::GetFunction(Nan::New<v8::FunctionTemplate>(Request)).ToLocalChecked());

    Nan::Set(target, Nan::New("disconnect").ToLocalChecked(),
        Nan::GetFunction(Nan::New<v8::FunctionTemplate>(Disconnect)).ToLocalChecked());
}

NODE_MODULE(binding, Init)
